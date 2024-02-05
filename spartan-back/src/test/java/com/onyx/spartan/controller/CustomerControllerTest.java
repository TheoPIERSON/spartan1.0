package com.onyx.spartan.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.onyx.spartan.model.Customers;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.sql.Date;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class CustomerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    public Customers customer;

    @Test
    void addCustomers() throws Exception {
        Customers customer = new Customers();
        customer.setFirstname("test prenom ok");
        customer.setLastname("test nom ok");
        customer.setBirthdate(Date.valueOf("2000-01-01"));
        customer.setMail("test mail ok");
        customer.setPhoneNumber("07 07 07 07 07");

        String customerJson = objectMapper.writeValueAsString(customer);

        mockMvc.perform(MockMvcRequestBuilders.post("/customers/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(customerJson))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("Test de récupération d'un client par ID")
    public void testReadClient() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/customers/1"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Test de mise à jour d'un client par ID")
    public void testUpdateClient() throws Exception {
        Customers customer = new Customers();
        customer.setId(999L);
        customer.setFirstname("test prenom ok");
        customer.setLastname("test nom ok");
        customer.setBirthdate(Date.valueOf("2000-01-01"));
        customer.setMail("test mail ok");
        customer.setPhoneNumber("07 07 07 07 07");

        System.out.println(customer);

        customer.setLastname("UpdatedLastName");
        customer.setFirstname("updateFirstName");

        String updatedClientJson = objectMapper.writeValueAsString(customer);
        mockMvc.perform(MockMvcRequestBuilders.put("/customers/update/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedClientJson))
                .andExpect(status().isOk());

    }
    @Test
    @DisplayName("Test de suppression d'un client par ID")
    public void testDeleteCustomer() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/customers/delete/1"))
                .andExpect(status().isOk());
    }

}
