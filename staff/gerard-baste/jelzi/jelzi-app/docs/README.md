# Jelzi Food App

## Intro

This application is thought of as an aid in planning for a museum trip to the Rijksmuseum in Amsterdam, allowing a user to search, review and save favorite images for viewing when they go to the Rijksmuseum.

## Functional description

The "Rainy Saturday App" allows the user to access the vast realm of artwork in the Rijksmuseum and plan a visit for the next "rainy Saturday" Once registered and logged in, the user may search through the artwork -- which consists not only of paintings, sculptures and drawings, but also of material objects such as shoes -- using any search term. Clicking on the image of the artwork, the user may find out details about the materials used in its manufacture as well as wehn it was created.  The user may also filter the results by period, by principal maker (artist), and by century.  

The user can select artworks as "favourites" and save them for later reference, so that when the user visits the museum they may know which artworks are the first they want to see.

### Use Cases

![](images/jelzi-food-uses-cases.png)

<!-- ### Activities (flows)

- login

![](images/spotify-app_login-activity-diagram-(flow-diagram).png) -->


<!-- ### [Views (design)](design) -->

## Technical description

The application is a web application that is meant to run within a browser environment. It consists of a ReactJS frontend with Reactstrap that connects to two APIS: 

- a "user" API that handles user data.
- the Edamam API for searching the recipes database

User data is persistent across page reloads, as local data is stored in the user's SessionStorage.  

### Blocks

![](images/jelzi-food-app_blocks-diagram.png)

### Components

![](images/jelzy-food_components-diagram.png)

<!-- ### Sequences

- search

![](images/rainy-saturday_search-sequence-diagram.png) -->


<!-- ### Classes

- React App/Register components

![](images/rainy-saturday_classes-main.png)

- React search components

![](images/rainy-saturday_classes-search.png) -->


<!-- ### Data model

![](images/spotify-app_data-model-diagram.png)  -->