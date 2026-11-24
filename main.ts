// Angry Judge: The Short Rant Contest — a funny rant about a small everyday
// annoyance, capped at 400 characters. Writes the rant to /output/entry.txt.
import { mkdir, writeFile } from "node:fs/promises";

class RantEmitter {
  private readonly dir = "/output";
  private readonly file = "/output/entry.txt";

  private measure(text: string): number {
    const n = [...text].length;
    if (n < 1 || n > 400) {
      throw new Error(`rant is ${n} chars, must be 1-400`);
    }
    if (!text.trim()) {
      throw new Error("rant must not be only whitespace");
    }
    return n;
  }

  async run(text: string): Promise<void> {
    const n = this.measure(text);
    await mkdir(this.dir, { recursive: true });
    await writeFile(this.file, text, { encoding: "utf8" });
    console.log(`wrote ${n} chars to ${this.file}`);
  }
}

const RANT =
  "My smoke detector only ever needs a new battery at 3 a.m. One chirp, every forty seconds — too rare to find, too regular to sleep through. It is a little white disc on the ceiling with exactly one job, and it does that job the way a cat knocks a glass off a table: on purpose, at 3 a.m., while looking right at me.";

await new RantEmitter().run(RANT);
