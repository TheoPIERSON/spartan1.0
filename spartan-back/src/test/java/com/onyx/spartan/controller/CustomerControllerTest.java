package com.onyx.spartan.controller;

import com.onyx.spartan.model.Customers;
import com.onyx.spartan.repository.CustomersRepository;
import com.onyx.spartan.service.CustomersService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class CustomerControllerTest {

    @Mock
    private CustomersRepository dao;

    @InjectMocks
    private CustomersService service;

    @Test
    void testFindAllCustomers() {
        // Créer une liste de clients
        List<Customers> customerList = new ArrayList<>();
        Customers customerOne = new Customers();
        Customers customerTwo = new Customers();
        Customers customerThree = new Customers();

        customerList.add(customerOne);
        customerList.add(customerTwo);
        customerList.add(customerThree);

        // Mock du DAO
        when(dao.findAll()).thenReturn(customerList);

        // Exécuter le test
        Iterable<Customers> actualCustomerList = service.getAllCustomers();

        // Vérifier les résultats
        int size = 0;
        for (Customers customer : actualCustomerList) {
            size++;
        }
        assertEquals(3, size);
        verify(dao, times(1)).findAll(); // Vérifie que la méthode findAll() a été appelée une seule fois
    }


    @Test
    void addCustomers() throws Exception {
        Customers customer = new Customers();
        customer.setFirstname("test prenom ok");
        customer.setLastname("test nom ok");
        customer.setBirthdate(Date.valueOf("2000-01-01"));
        customer.setMail("test mail ok");
        customer.setPhoneNumber("07 07 07 07 07");

        service.addCustomer(customer);
        verify(dao, times(1)).save(customer);

    }

//    @Test
//    @DisplayName("Test de récupération d'un client par ID")
//    public void testReadClient() throws Exception {
//        mockMvc.perform(MockMvcRequestBuilders.get("/customers/1"))
//                .andExpect(status().isOk());
//    }

//    @Test
//    @DisplayName("Test de mise à jour d'un client par ID")
//    public void testUpdateClient() throws Exception {
//        Customers customer = new Customers();
//        customer.setId(999L);
//        customer.setFirstname("test prenom ok");
//        customer.setLastname("test nom ok");
//        customer.setBirthdate(Date.valueOf("2000-01-01"));
//        customer.setMail("test mail ok");
//        customer.setPhoneNumber("07 07 07 07 07");
//
//        System.out.println(customer);
//
//        customer.setLastname("UpdatedLastName");
//        customer.setFirstname("updateFirstName");
//
//        String updatedClientJson = objectMapper.writeValueAsString(customer);
//        mockMvc.perform(MockMvcRequestBuilders.put("/customers/update/1")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(updatedClientJson))
//                .andExpect(status().isOk());
//
//    }
//    @Test
//    @DisplayName("Test de suppression d'un client par ID")
//    public void testDeleteCustomer() throws Exception {
//        mockMvc.perform(MockMvcRequestBuilders.delete("/customers/delete/1"))
//                .andExpect(status().isOk());
//    }
}
