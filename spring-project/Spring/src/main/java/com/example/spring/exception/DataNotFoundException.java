package com.example.spring.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class DataNotFoundException extends RuntimeException {
    public DataNotFoundException(Throwable e) {
        super(e);
    }
}
