import 'styled-components';

import type { TableTheme } from '../DataTable/types';

declare module 'styled-components' {
	export interface DefaultTheme extends TableTheme {}
}
