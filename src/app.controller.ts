import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './dto/user.dto';
import { TweetDto } from './dto/tweets.dto';

@Controller()

export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  
  //teste não por /health na rota
  @Get()
  getHealth() {

    return "I'm okay!"

  }



  @Post('/sign-up')
  @HttpCode(200)
  signUp(@Body() body: UserDto) {

    return this.appService.signUp(body)

  }



  @Get('/tweets')
  tweetsGet(@Query('page') page?: number) {

    if (page < 1 && page) {

      throw new HttpException(
        
        "Informe uma página válida!",
        HttpStatus.BAD_REQUEST //400

      )
    }

    return this.appService.tweetsGet(page)

  }



  @Post('/tweets')
  tweetPost(@Body() body: TweetDto) {

    try {

      return this.appService.tweetPost(body)

    } catch (error) {

      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED) //401

    }

  }


  
  @Get('/tweets/:username')
  @HttpCode(200)
  tweetsUserGet(@Param('username') username: string) {

    return this.appService.tweetsUserGet(username)

  }

}


