全局变量

在 global.d.ts 中声明 d3

```typescript
import * as _d3 from "d3";

declare global {
	const d3: typeof _d3;
}
```
