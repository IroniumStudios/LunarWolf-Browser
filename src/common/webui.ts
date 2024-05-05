/* Copyright (c) 2021-2024 Damon Smith */

import { WEBUI_BASE_URL, WEBUI_URL_SUFFIX } from '~/constants/files';

export const getWebUIURL = (hostname: string) =>
  `${WEBUI_BASE_URL}${hostname}${WEBUI_URL_SUFFIX}`;
