import { STATE, Status } from "./status";

export interface Website {
  url: string;
  name: string;
  state: STATE;
  uptime: number;
  responseTime: number;
  lastChecked: string;
}

export function WebsiteItem(props: Website) {
  const { url, name, state, uptime, responseTime, lastChecked } = props;

  return (
    <div className="my-1 border border-gray-700 rounded-lg p-4 max-w-xs">
      <div className="flex justify-between">
        <h3 className="font-bold">{name}</h3>
        <Status state={state} />
      </div>

      <div>
        <span className="text-gray-600 text-xs">{url}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm">Uptime</span>
        <span className="text-sm font-medium">{uptime}%</span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm">Response Time</span>
        <span className="text-sm font-medium">{responseTime}ms</span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm">Last Checked</span>
        <span className="text-sm font-medium">{lastChecked}</span>
      </div>
    </div>
  );
}
