package com.ntatvr.springmvc.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * [@ApiModelProperty] This annotation is used in the Model property to add some description to the
 * Swagger output for that model attribute.
 * 
 * @author AnhNT
 *
 */
@Getter
@Setter
@Entity
@Table(name = "customer")
public class Customer implements Serializable {

  private static final long serialVersionUID = -1910468634969245768L;

  @ApiModelProperty(notes = "Identity id of the Customer", name = "id", required = true)
  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ApiModelProperty(notes = "Name of the Customer", name = "name", required = false)
  @Column(name = "name")
  private String name;

  @ApiModelProperty(notes = "Address of the Customer", name = "address", required = false)
  @Column(name = "address")
  private String address;
}
