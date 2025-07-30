'use client';

import { Keystatic } from '@keystatic/core/ui';
import config from '../../../keystatic.config';
import { Config } from '@keystatic/core';

export default function KeystaticPage() {
  return <Keystatic config={config as Config} />;
}