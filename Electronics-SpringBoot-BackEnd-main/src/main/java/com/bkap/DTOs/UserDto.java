package com.bkap.DTOs;

import com.bkap.Entities.Review;
import com.bkap.Entities.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

public class UserDto {
    private int id;
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String address;
    private String email;
    private int phone;
    private List<UserRoleDto> UserRolesDtos;
    private List<Review> reviews;

    public UserDto() {
        super();
        // TODO Auto-generated constructor stub
    }

    public UserDto(int id, String firstName, String lastName, String username, String password, String address, String email, int phone, List<UserRoleDto> userRolesDtos, List<Review> reviews) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.address = address;
        this.email = email;
        this.phone = phone;
        UserRolesDtos = userRolesDtos;
        this.reviews = reviews;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

//    @JsonIgnore
    public List<UserRoleDto> getUserRolesDtos() {
        return UserRolesDtos;
    }

    public void setUserRolesDtos(List<UserRoleDto> userRolesDtos) {
        UserRolesDtos = userRolesDtos;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }
}
