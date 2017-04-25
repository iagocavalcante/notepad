import {Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})

export class Truncate implements PipeTransform{
  transform(value: string, args: string[]): string {
    let limit = parseInt(args[0]);
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}