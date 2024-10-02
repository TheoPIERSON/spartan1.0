package com.onyx.spartan.controller;

import com.onyx.spartan.customer.Customers;
import com.onyx.spartan.customer.CustomersRepository;
import com.onyx.spartan.customer.CustomersService;
import com.onyx.spartan.global_security.validation.ValidationService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CustomerControllerTest {

    @Mock
    CustomersRepository dao;
    @InjectMocks
    CustomersService service;

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


//    @Test
//    void addCustomers() throws Exception {
//
//        Customers customer = new Customers();
//        customer.setFirstname("test prenom ok");
//        customer.setLastname("test nom ok");
//        customer.setBirthdate(Date.valueOf("2000-01-01"));
//        customer.setEmail("testmail@ok.com");
//        customer.setPhoneNumber("07 07 07 07 07");
//        customer.setPassword("0000");
//
//        service.addCustomer(customer);
//        verify(dao, times(1)).save(customer);
//
//    }

    @Test
    void testFindCustomerById() {
        // Création d'un customer fictif avec un ID donné
        long customerId = 123;
        Customers expectedCustomer = new Customers();
        expectedCustomer.setId(customerId);
        expectedCustomer.setFirstname("John");
        expectedCustomer.setLastname("Cena");

        // Configuration du mock pour retourner le customer fictif lorsque findCustomerById est appelé avec l'ID donné
        when(dao.findCustomerById(customerId)).thenReturn(expectedCustomer);

        // Appel de la méthode à tester avec l'ID fictif
        Customers actualCustomer = service.findCustomerById(customerId);

        // Vérification que le customer retourné correspond au customer attendu
        assertNotNull(actualCustomer);
        assertEquals(expectedCustomer.getId(), actualCustomer.getId());
        assertEquals(expectedCustomer.getFirstname(), actualCustomer.getFirstname());
        assertEquals(expectedCustomer.getLastname(), actualCustomer.getLastname());

        // Vérification que la méthode du repository a été appelée exactement une fois avec l'ID donné
        verify(dao, times(1)).findCustomerById(customerId);
    }



//    @Test
//    @DisplayName("Test de mise à jour d'un client par ID")
//    public void testUpdateClient() throws Exception {
//        long customerId = 1L;
//        Customers customer = new Customers();
//        customer.setId(customerId);
//        customer.setFirstname("test prenom ok");
//        customer.setLastname("test nom ok");
//        customer.setBirthdate(Date.valueOf("2000-01-01"));
//        customer.setEmail("test mail ok");
//        customer.setPhoneNumber("07 07 07 07 07");
//
//        // Mise à jour des détails du customer
//        customer.setFirstname("updateFirstName");
//        customer.setLastname("UpdatedLastName");
//
//        // Exécution de la mise à jour via le service
//        service.updateCustomer(customer);
//
//        // Vérification que la méthode de mise à jour du repository a été appelée exactement une fois avec le customer mis à jour
//        verify(dao, times(1)).save(customer);
//    }


    @Test
    @DisplayName("Test de suppression d'un client par ID")
    public void testDeleteCustomer() throws Exception {
        long customerId = 1L;
        Customers customer = new Customers();
        customer.setId(customerId);
        customer.setFirstname("test prenom ok");
        customer.setLastname("test nom ok");
        customer.setBirthdate(Date.valueOf("2000-01-01"));
        customer.setEmail("test mail ok");
        customer.setPhoneNumber("07 07 07 07 07");
        service.deleteCustomer(customerId);

        verify(dao, times(1)).deleteById(customerId);


    }
}
