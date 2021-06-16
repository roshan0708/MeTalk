<p align="center">
  <img height=450 width="auto" src="https://user-images.githubusercontent.com/60403638/122261515-1aaec180-cef2-11eb-855c-141477b8a6d1.png" alt="custom image"/>
  <h1 align="center">Project MeTalk🚀</h1>
  <p align="center">
  Making online conversations simpler
    <br />
  </p>
</p>

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Future Updates](#future-updates)


## About The Project

<p align="center">
  <img src="https://user-images.githubusercontent.com/60403638/122263235-d58b8f00-cef3-11eb-88ff-a6172ed924b7.png" alt="project_img" />
  <h3 align="center">Homepage</h3>
</p>

The aim of **Project MeTalk** is to make the interaction of people throught out the world **more convenient**, **hassle-free** and in more **customized** way. This platform is built while keeping in mind the easiness and security of the people's data and their use-case.

:man_mechanic: **Here's all the services provided**:

:man: Login / Register using **Firebase**

:muscle: Public and Private rooms

:open_file_folder: Media Sharing

:raising_hand_man: Typing and Presence Indicators

## Built With

<div float="left">

<img alt="CSS" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />

<img alt="JS" src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black">

<img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  
<img alt="React-Router" src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />

<img alt="Redux" src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" />

<img alt="Firebase" src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black" />

</div>

## Getting Started

Follow these simple steps to run the project locally:

### Prerequisites

- [Node.js](https://nodejs.org/en/) (latest)
- **NOTE** - Make sure you have **yarn** in your `path variables` because I've used yarn for this project 

### Installation

1. Create an account on [Firebase](https://firebase.google.com/) if you have not yet.
2. Refer this [link](https://www.youtube.com/watch?v=PKwu15ldZ7k) to learn basics of firebase, like how to setup project in React and stuff like that.
3. Create a `.env` file in the <b>root</b> directory of the project. Add environment-specific variables on new lines in the form of `NAME=VALUE` by following same structure as provided in `env.example` file

   ```dosini
      REACT_APP_API_KEY=<api_key>
      REACT_APP_AUTH_DOMAIN=<auth_domain>
      REACT_APP_PROJECT_ID=<project_id>
      REACT_APP_STORAGE_BUCKET=<storage_bucket>
      REACT_APP_MESSAGING_SENDER_ID=<sender_id>
      REACT_APP_APP_ID=<app_id>
      REACT_APP_MEASUREMENT_ID=<measurement_id>
   ```

4. Install all the dependencies of `package.json` file by running below command in root directory.

   ```
   yarn
   ```
   
5. Run the following command in the root directory to start the project

   ```
   yarn start
   ```
   
🥳Viola! Project starts running at `localhost:3000`

## Future Updates
* Enable PWA
* Sticker Bar
* Improve Overall UI/UX and fix bugs
* Responsive Design

And More! There's always room for improvement!
