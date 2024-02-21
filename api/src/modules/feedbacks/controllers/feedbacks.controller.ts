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
    const _file = { ...file };
    _file.originalname = 'arroba.png';

    const byteArray = new Uint8Array(_file.buffer);

    /* const blob = new Blob([byteArray], { type: _file.mimetype }); */

    const fileObj = new File([byteArray], file.originalname, {
      type: file.mimetype,
    });

    const supabaseResult = await this.supabase.storage
      .from('feedback')
      .upload('bugs/arroba.png', fileObj, {
        upsert: true,
        contentType: 'image/png',
      });
  }
}
