import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { supabase } from 'src/lib/supabase';

import { FileInterceptor } from '@nestjs/platform-express';
import { SupabaseClient } from '@supabase/supabase-js';

@Controller('/feedbacks')
export class FeedbacksController {
  private readonly supabase: SupabaseClient;

  constructor() {
    this.supabase = supabase;
  }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  public async create(@UploadedFile() file, @Body() body) {
    console.log('typeof: ', typeof file);
    console.log('file HERE: ', file);
    console.log('BODY HERE: ', body);

    console.log('FILE: ', file);
    const supabaseResult = await this.supabase.storage
      .from('feedback')
      .upload('bugs/arroba.png', file, { upsert: true });

    console.log('supabaseResult', supabaseResult);
  }
}
