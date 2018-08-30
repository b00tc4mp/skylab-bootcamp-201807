import { connect } from "mongoose";

export default function(host: string, port: number, name: string) {
  return connect(`mongodb://${host}:${port}/${name}`, { useNewUrlParser: true });
}
