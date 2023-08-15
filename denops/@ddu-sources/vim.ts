import {
  BaseSource,
  Context,
  Item,
} from "https://deno.land/x/ddu_vim@v3.5.0/types.ts";
import { Denops } from "https://deno.land/x/ddu_vim@v3.5.0/deps.ts";

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
