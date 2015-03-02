package controllers.users;

import models.User;
import controllers.posts.PostResponse;

public class UserResponse {

	public long id;
	public String displayName;
	public String photo;
	public String loginName;
	
	public static UserResponse convertToJson(User user) {
		UserResponse userResponse = new UserResponse();
		userResponse.id = user.id;
		userResponse.displayName = user.displayName;
		userResponse.photo = user.photo;
		userResponse.loginName = user.loginName;
		return userResponse;
	}
}
