import { Injectable } from '@nestjs/common';
import User from './entities/user.entities';
import Tweet from './entities/tweets.entities';
import { UserDto } from './dto/user.dto';
import { TweetDto } from './dto/tweets.dto';



@Injectable()
export class AppService {

  //arr tweets sub
  private tweets: Tweet[] = []
  // arr users sub
  private users: User[] = []


  
  healthGet():string {

    return "I'm okay!" 

  }



  signUp(body: UserDto) {

    const user = new User(body.username, body.avatar)

    return this.users.push(user)

  }



  tweetsGet(page?: number) {

    return this.tweets.reverse()
      .slice((page ? page - 1 : 0) * 10, page ? page * 10 : 10).map((tweet) => ({

        username: tweet.user.username,
        avatar: tweet.user.avatar,
        tweet: tweet.tweet

      }
      ))

  }



  tweetPost(body: TweetDto) {
    
    const userOn = this.users.find((user) => {

      return user.username === body.username

    })

    if (!userOn) {

      throw { message: "Usuário não encontrado" }

    }

    this.tweets.push(new Tweet(userOn, body.tweet))

  }



  tweetsUserGet(username: string) {

    return this.tweets.reverse()
      .filter((tweet) => tweet.user.username === username)
      .map((tweet) => ({

        username: tweet.user.username,
        avatar: tweet.user.avatar,
        tweet: tweet.tweet

      }
      ))

  }

}