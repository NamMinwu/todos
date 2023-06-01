import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';

import { PageService } from './page.service';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}
  @ApiParam({ name: 'id', required: true, description: 'id' })
  //   @ApiParam({ type: GetTodo })
  @Get(':id')
  async getTodo(@Param('id') id: string) {
    return await this.pageService.getTodo(id);
  }
}
