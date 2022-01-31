<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="200" alt="Nest Logo" /></a>
</p>

# NestJs with DDD, CQRS and MongoDB

## Background

Simple nestjs app made with DDD and CQRS principles.

## More about DDD

To read more what is DDD, I suggest to start with this [article](https://thedomaindrivendesign.io/what-is-ddd/)

## DDD layers

Layers in this small application are divided using this image

![DDD Layers](https://miro.medium.com/max/536/1*npa_vJrIfMXOROOwyVsTsw.png 'DDD Layers')

In our case we have following layers:

```
api - Presentation Layer

app - Application Layer

domain - Domain Layer

infra - Infrastructure Layer
```

## TODO
- Clean up
- Add value object for userId
- Add some tests