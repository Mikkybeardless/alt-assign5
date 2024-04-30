import { Blog } from "../database/schema/blog.schema.js";
import * as BlogService from "./blog.service.js";


describe("Service: Blog Service", function () {


  beforeEach(() => {
    jest.reset;
  });

  it("should return all blogs", async () => {
    // Given
    const mockBlogs = [
      {
        title: "Blog 1",
        description: "my first test",
        author: "Igashi",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen boo",
        state: "published"
      },
      {
        title: "Blog 2",
        description: "my second test",
        author: "Igashi",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae dui vel justo venenatis tristique. Quisque consequat lectus ac justo molestie, at facilisis mauris pellentesque. In quis mattis risus, vel cursus sem.",
        state: "published"
      },
    ];
    Blog.find = jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnValue(mockBlogs),
    });

    Blog.countDocuments = jest.fn().mockResolvedValue(mockBlogs.length);

    // When
    const result = await BlogService.getAllBlogs();

    // Then
    expect(result.data).toEqual(mockBlogs);
    expect(result.meta.total).toEqual(mockBlogs.length);
    expect(Blog.find).toHaveBeenCalledTimes(1);
    expect(Blog.countDocuments).toHaveBeenCalledTimes(1);
  });

  it("should throw an error when failed to get all blogs", async () => {
    // Given
    Blog.find = jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockRejectedValue(new Error("Failed to get blogs")),
    });

    await expect(BlogService.getAllBlogs()).rejects.toThrow(
      "Failed to get blogs"
    );
  });

  it("should return all published blogs", async () => {
    // Given
   
 
    const publishedBlogs = [
      {
        title: "Blog 1",
        description: "my first test",
        author: "Igashi",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen boo",
         state: "published"
      },

      {
        title: "Blog 3",
        description: "my third test",
        author: "Igashi",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae dui vel justo venenatis tristique. Quisque consequat lectus ac justo molestie, at facilisis mauris pellentesque. In quis mattis risus, vel cursus sem.",
        state: "published"
      }
    ]

    Blog.find = jest.fn().mockReturnValue({
      state: state,
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnValue(publishedBlogs),
    });

    Blog.countDocuments = jest.fn().mockResolvedValue(publishedBlogs);

    // When
    let page = 1;
    let limit = 10;
    let query = null;
    let state = "published";
    const result = await BlogService.getBlogByState(page ,limit ,query , state);

    // Then
    expect(result.data.state).toEqual(publishedBlogs.state);
    expect(Blog.find).toHaveBeenCalledTimes(1);
    expect(Blog.countDocuments).toHaveBeenCalledTimes(1);
 
    
  });

})



