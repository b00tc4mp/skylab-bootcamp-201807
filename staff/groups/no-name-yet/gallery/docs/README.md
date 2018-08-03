# Gallery App

## Introduction

This application lets you upload pictures and apply different styles.
You also can take pictures from your webcam and save the results in your own gallery.

It was developed as a front-end project for the Skylab Coders bootcamp (Barcelona, 2018). The objective was to apply the following technologies in a real life application:

- HTML
- CSS
- Javascript (ES6)
- React 
- React Router
- Sass
- BEM
- APIs


## Functional description

### Use cases diagram

As a user you can register and login. Then, you can take a picture with your webcam or upload a picture from your files. You can save the picture in your gallery and apply a style to it.
You can also update your information and delete your acount.

![Use_Case_Diagram](images/Use_Case_Diagram.jpg)

### Activity diagram

We just have two principal activities, upload a picture or take a picture. You can choose to apply some style or just save the picture in the galery. Finally, you can choose to delete the picture when you want.

![Activity_Diagram](images/Activity_diagram.png)

## Technical Description

### Block diagram

The front end of the application was built using React. The back end is connected to 3 APIs in order to manage the users, store the images (cloudinary) and transform the images (cloudmersive).

![Block-Diagram](images/blockdiagram.png)

### Components Diagram

Our application just have some react components, the business logic and the three api that we use, UserAPi, CloudinaryAPI and CloudmersiveAPI.

![Component-Diagram](images/ComponentsDiagram.png)

### Sequence Diagram

In this application, we have some repetitives sequence. The most significant are those that use the two APIs, Cloudinary and Cloudmersive.
With the Cloudinary API we save the images and with the Cloudmersive API we transform the images, if the user decides to add a style to them.

![Sequence-Diagram](images/sequencies_login_diagram.png)


![Sequence-Diagram](images/saveImage_sequencies_diagram.png)


![Sequence-Diagram](images/transform_sequencies_diagram.png)

### Class Diagram

We have differents components, the App, Main, Landing, Login, Register, Gallery, Profile and Navbar. All extends from Component.
In this diagram we have the interaction between the components.

![Class-Diagram](images/class_diagram.png)



### Data Diagram

Our logic have two componentes. The image and the user. The user have the username, id, password and gallery. In the other hand, the image have the id and the url. 

![Data-Diagram](images/data_diagram.png)
