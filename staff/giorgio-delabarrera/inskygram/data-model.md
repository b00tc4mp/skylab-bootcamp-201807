
# Models

## User

- id
- username
- password
- name
- website
- email
- phone_number
- gender
- biography
- avatar
- private_account
- last_login
- enable
- created
- updated

## Post

- id
- image
- caption
- location ?
  - latitud ?
  - length ?
- user_id
- created

## UserTag

- post_id
- user_id
- created

## Followers

- user_id
- follower_id
- created

## Following

- user_id
- following_id
- created

## PostLike

- post_id
- user_id
- created

## PostSaved

- user_id
- post_id
- created

## Comment

- post_id
- user_id
- description
- created

## NotificationType

- id
- name

## Notification

- id
- notification_type_id
- created