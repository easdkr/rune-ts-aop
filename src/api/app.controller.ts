import { AppService } from '@/api/app.service';
import { Controller, Get } from '@lib/common';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {
    console.log(this.appService);
  }

  @Get()
  getHello(_: any, res: any): void {
    res.send(this.appService.getHello());
  }
}
