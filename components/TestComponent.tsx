import ClientComponent from "./ClientComponent";
import ServerComponent from "./ServerComponent";

export default function TestComponent() {
  return (
    <div>
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
