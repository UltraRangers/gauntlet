# Modules

Modules are separated by the entities beneath them. Inside each entities contains the needs of an entity. The example below:

- Create - handles creation/saving of entity
- Delete - handles deleting of an entity
- Edit - handles editing of an entity
- Browse - handles retrieving WITHOUT `id` of an entity (find all)
- Read - handles retrieving WITH `id` of an entity (find one)

# Unit Tests
The unit tests per route is considered as an e2e test for the reason that it simulate the request and response a specific route of a module.