package main


type User struct {
	_id string `json:”id,omitempty”`
	Name string `json:”name,omitempty”`
	Email string `json:”email,omitempty”`
	AvatarName string `json:”avatarName,omitempty”`
	}