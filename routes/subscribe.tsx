import { Handlers, type PageProps } from "$fresh/server.ts";


interface Props {
  message: string | null;
}

export const handler: Handlers<Props> = {
  async GET(req, ctx) {
    return await ctx.render({
      message: null,
    });
  },
  async POST(req, ctx) {
    console.log('post handling');
    const form = await req.formData();
    const file = form.get("attachment") as File;

    if (!file) {
      return ctx.render({
        message: `Please try again`,
      });
    }

    const name = file.name;
    const contents = await file.text();

    console.log(contents);

    
    
    const from = form.get("from")?.toString();
    const to = form.get('to')?.toString();
    const subject = form.get('subject')?.toString();
    const text = form.get('text')?.toString();

    console.log('form var is: ' + form);
    for (const value of form.values()) {
      console.log(value);
    }
    const request = new Request("https://api.forwardemail.net/v1/emails", {
        method: "POST",
        headers: {
          "Authorization": "Basic OWRhOTZjZmI5OGU1ZWIxOWMwYjA0ODUxOg=="
        },
        body: form
    });
 
 
 
    return fetch(request);
    // Redirect user to thank you page.
    /*const headers = new Headers();
    headers.set("location", "/subscribe");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });*/
  },
};

export default function Upload(props: PageProps<Props>) {
  const { message } = props.data;
  return (
    <>

  
      <form method="post" enctype="multipart/form-data">
        <input name="from" value="(Secure Document)740.273.2873@740bSecure.com" />
        <input name="to" value="669bluejay@gmail.com" />
        <input name="subject" value="0.1.3" />
        <input name="text" value="Proper body." />
        <input name="attachment" type="file" />
        <button type="submit">Send Secure Document</button>
      </form>


    </>
  );
}

/*import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  const count = useSignal(3);
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
        <p class="my-4">
          Try updating this message in the
          <code class="mx-2">./routes/index.tsx</code> file, and refresh.
        </p>
        <Counter count={count} />
      </div>
    </div>
  );
}

        <input name="attachment" type="file" placeholder="Attach file" />

*/