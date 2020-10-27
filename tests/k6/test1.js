import http from "k6/http";
import { sleep } from "k6";
export default function () {
  http.get("https://l00k0.sse.codesandbox.io/");
  sleep(1);
}
