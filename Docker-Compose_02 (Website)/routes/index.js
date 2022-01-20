var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
require('marko/node-require').install()// Habilita o uso do template Marko
require('marko/express')
let Book = require('../models/Book')
var indexTemplate = require('../views/index.marko')


// Busca a página e carrega os livros
router.get('/', (req, res) => {
    console.log("Exibindo a Home!")
    if(mongoose.connection.readyState){
        Book.find({}).then((books) => {
            res.marko(indexTemplate, {books: books})
        })
    }else{
        res.marko(indexTemplate)
    }
})


// Seed nos arquivos
router.get('/seed', (req,res) => {
    let livros = [
        new Book({
            name: "Modulo Udilink", 
            price: "R$89,90", 
            description: "Aprendendo utilizar o Módulo UDILINK", 
            cover: "udilink.png"
        }),
        new Book(
        {
            name: "Modulo FARM", 
            price: "R$89,90", 
            description: "Aprendendo utilizar o Módulo FARM",  
            cover: "farm.png"
        }),
         new Book({
            name: "Modulo PEC", 
            price: "R$89,90", 
            description: "Aprendendo utilizar o Módulo PEC" ,
            cover: "pec.png"
        }),
        new Book({
            name: "Modulo PCM", 
            price: "R$89,90", 
            description: "Aprendendo utilizar o Módulo PCM",  
            cover: "pcm.png"
        }),
        new Book({
            name: "Plataforma Sankhya", 
            price: "R$89,90", 
            description: "Aprendendo usar a Plataforma Sankhya",  
            cover: "sankhya.png"
        }),
        new Book(
        {
            name: "Plataforma CodeStore", 
            price: "R$119,90", 
            description: "Aprenda utilizar a melhor Store do Brasil, CodeStore!",  
            cover: "codestore.png"
        })


    ]
                    
         
    Book.insertMany(livros).then(moogoseDocuments => {
        console.log(moogoseDocuments, "Inseridos com sucesso")
    }).catch(err => {
        console.log(err)
    })  
    res.send("Livros salvos com sucesso! Retorne a página anterior e a atualize.");
    
})

module.exports = router;