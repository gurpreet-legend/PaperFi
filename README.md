# PaperFi: A Platform for Decentralized Crowdfunding and Asset Acquisition of Research Papers

In order to address some of the issues with the present system of fundraising and asset acquisition associated with research activities this project aims to develop a decentralised and secure crowdfunding and asset management platform utilising DLTs (particularly employing blockchain technology)

![GitHub last commit](https://img.shields.io/github/last-commit/gurpreet-legend/golang-url-shortener?style=for-the-badge)&nbsp;
![GitHub issues](https://img.shields.io/github/issues/gurpreet-legend/golang-url-shortener?style=for-the-badge)&nbsp;
![GitHub repo size](https://img.shields.io/github/repo-size/gurpreet-legend/golang-url-shortener?style=for-the-badge)

## Tech-Stack 👩‍💻

<a href="https://go.dev/" target="_blank"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg" width="60px" height="60px"/> </a>&nbsp;
<a href="https://gofiber.io/" target="_blank"> <img src="https://gofiber.io/assets/images/logo.svg" width="80px" height="80px"/> </a>&nbsp;
<a href="https://redis.io/" target="_blank"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" width="60px" height="60px"/> </a>&nbsp;
<a href="https://www.docker.com/" target="_blank"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="70px" height="70px"/> </a>&nbsp;


## Features ✨

:white_check_mark: &nbsp;Users can create custom shorten URL

:white_check_mark: &nbsp;Rate limiter to restrict users to exploit the API

:white_check_mark: &nbsp;Containerized the whole application using Docker and Docker-compose for easy set-up

:white_check_mark: &nbsp;Suitable checks for non-redundancy in URL creation 

## Project Setup ⚙
- Clone the repository using `git clone <repo_url>`
- Go to the project directory using `cd golang-url-shortener`
- Install docker and docker-compose on windows, follow these [instructions](https://docs.docker.com/desktop/install/windows-install/) for easy setup.
- Create a `.env` file in `/api/` folder similar to `.env.example` file. 
- Run `docker-compose up -d` to spin the docker containers for Go-Fiber server and Redis database at ports `localhost:3000` and `localhost:6379` respectively.
- You can test the API using [postman](https://www.postman.com/) or VSCode's [thunder client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) using following api call:
  - **POST** request at `localhost:3000/api/v1` with body:
  ```json
  {
    "url" : "URL_TO_BE_SHORTEN",
    "custom" : "UNIQUE_CUSTOM_URL_ID"
  }
  ```
  which will respond you with a response format:
  ```json
  {
     "url":                "URL_TO_BE_SHORTEN",
     "short":              "SHORTEN_URL",
	 "expiry":             "Cache expiry {set to 30 mins}",
	 "rate_limit":         "No of times the API have been called", 
	 "rate_limit_reset":   "After how much time the rate limit will reset (in hours)",
  }
  ```
  
  - **GET** request at `localhost:3000/:URL_TO_BE_SHORTEN` will redirect to the original URL.