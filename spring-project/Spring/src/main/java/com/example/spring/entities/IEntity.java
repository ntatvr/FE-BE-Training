package com.example.spring.entities;

import java.io.Serializable;

public interface IEntity extends Serializable {
    <T> T getId();
}
