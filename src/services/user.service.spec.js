import {User} from "../database/schema/user.schema.js";
import * as UserService from "./user.service";

describe("Service: User Service", function () {
  // let User;
  // let getAllUsers;

  beforeEach(() => {
    jest.reset;
  });

  it("should return all users", async () => {
    // Given
    const mockUsers = [
      {
        name: "User 1",
        email: "user@mail.com",
        password: "password",
        role: "USER",
      },
      {
        name: "User 2",
        email: "user2@mail.com",
        password: "password",
        role: "USER",
      },
    ];
    User.find = jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnValue(mockUsers),
    });
    // this style below also works
    // jest.spyOn(User, "find").mockReturnValue({
    //   skip: jest.fn().mockReturnThis(),
    //   limit: jest.fn().mockReturnValue(users),
    // });
    User.countDocuments = jest.fn().mockResolvedValue(mockUsers.length);

    // When
    const result = await UserService.getAllUsers();

    // Then
    expect(result.data).toEqual(mockUsers);
    expect(result.meta.total).toEqual(mockUsers.length);
    expect(User.find).toHaveBeenCalledTimes(1);
    expect(User.countDocuments).toHaveBeenCalledTimes(1);
  });

  it("should throw an error when failed to get all users", async () => {
    // Given
    User.find = jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockRejectedValue(new Error("Failed to get users")),
    });

    await expect(UserService.getAllUsers()).rejects.toThrow(
      "Failed to get users"
    );
  });
});