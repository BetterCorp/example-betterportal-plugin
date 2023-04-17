import {
  ServicesBase,
  ServiceCallable,
  IPluginLogger,
} from "@bettercorp/service-base";
import { fastify } from "@bettercorp/service-base-plugin-web-server";
import { betterPortal } from "@bettercorp/service-base-plugin-betterportal";

export class Service extends ServicesBase<
  ServiceCallable,
  ServiceCallable,
  ServiceCallable,
  ServiceCallable,
  ServiceCallable,
  any
> {
  private fastify: fastify;
  private betterportal: betterPortal;
  constructor(
    pluginName: string,
    cwd: string,
    pluginCwd: string,
    log: IPluginLogger
  ) {
    super(pluginName, cwd, pluginCwd, log);
    this.fastify = new fastify(this);
    this.betterportal = new betterPortal(this, pluginName, pluginCwd);
  }

  public override async init() {
    await this.betterportal.initBPUI();
    await this.fastify.get("/abc/:id/", async (reply, params) => {
      await this.log.info("Request ID: {abc}", {
        abc: params.id,
      });
      return reply.send({ id: params.id });
    });
    await this.betterportal.read(
      "/abcp/:id/",
      null,
      async (reply, token, clientId, fields, params) => {
        await this.log.info("Request ID2: {abc}", {
          abc: params.id,
        });
        return reply.send({ id: params.id });
      }
    );
  }
}
