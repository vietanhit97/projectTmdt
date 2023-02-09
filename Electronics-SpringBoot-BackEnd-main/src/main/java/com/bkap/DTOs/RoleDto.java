package com.bkap.DTOs;

import javax.persistence.Column;

public class RoleDto {
    private int id;
    private String name;

    public RoleDto(int id, String name) {
        this.id = id;
        this.name = name;
    }
    public RoleDto() {
        super();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
