package main


type User struct {
	_id string `json:”id,omitempty”`
	Name string `json:”name,omitempty”`
	Email string `json:”email,omitempty”`
	Avatar string `json:”avatar,omitempty”`
	}