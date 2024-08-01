import {
  BaseSource,
  type Context,
  type Item,
} from "jsr:@shougo/ddu-vim@^5.0.0/types";
import type { Denops } from "jsr:@denops/core@^7.0.0";

type Params = {
  func: string;
};

export type ActionData = Record<string, never>;

export class Source extends BaseSource<Params> {
  override gather(args: {
    denops: Denops;
    context: Context;
    sourceParams: Params;
  }): ReadableStream<Item<ActionData>[]> {
    return new ReadableStream({
      async start(controller) {
        if (args.sourceParams.func != "") {
          const items = await args.denops.call(
            args.sourceParams.func) as Item<ActionData>[]
          controller.enqueue(items);
        }
        controller.close();
      },
    });
  }

  override params(): Params {
    return {
      func: "",
    };
  }
}
