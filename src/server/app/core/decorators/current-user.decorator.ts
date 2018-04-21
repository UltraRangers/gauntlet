import { createRouteParamDecorator } from '@nestjs/common';

export const CurrentUser = createRouteParamDecorator((data, request) => {
  return request.user;
});
