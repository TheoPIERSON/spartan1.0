//package com.onyx.spartan.controller;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.onyx.spartan.model.Customers;
//import jakarta.transaction.Transactional;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//
//import java.sql.Date;
//
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//// réelle
//
//@Transactional
//public class CustomersCrudIntegrationTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    @Test
//    public void testCRUDOperations() throws Exception {
//        Customers customers = new Customers();
//        customers.setFirstname("test prenom ok");
//        customers.setLastname("test nom ok");
//        customers.setBirthdate(Date.valueOf("2000-01-01"));
//        customers.setMail("test mail ok");
//        customers.setPhoneNumber("07 07 07 07 07");
//
//        String customersJson = objectMapper.writeValueAsString(customers);
//        //Create
//        mockMvc.perform(MockMvcRequestBuilders.post("/customers/add")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(customersJson))
//                .andExpect(status().isOk());
//
////        // Read
////        mockMvc.perform(MockMvcRequestBuilders.get("/customers/1"))
////                .andExpect(status().isOk());
////
////
////        // Delete
////        mockMvc.perform(MockMvcRequestBuilders.delete("/customers/delete/1"))
////                .andExpect(status().isOk());
////
////        // Update
////        customers.setLastname("UpdatedLastName");
////
////        mockMvc.perform(MockMvcRequestBuilders.put("/customers/update/1")
////                        .contentType(MediaType.APPLICATION_JSON)
////                        .content(customersJson))
////                .andExpect(status().isOk());
//
//    }
//}