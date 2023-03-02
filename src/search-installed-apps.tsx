import { ActionPanel, Action, Grid, environment, Icon } from "@raycast/api";
import SearchCollections from "./search-collections";
import SearchDiscovery from "./search-discovery";
import SearchProjects from "./search-projects";
import SearchDocs from "./search-docs";
import { useSpace } from "./hooks/use-space";

type Instance = {
  id: string;
  release: {
    app_name: string;
    icon_url?: string;
    short_description?: string;
    id: string;
  };
  url: string;
};


type InstancesResponse = {
  instances: Instance[];
};

export default function Command() {
  const { data, isLoading } = useSpace<InstancesResponse>("/instances");
  return (
    <Grid isLoading={isLoading} navigationTitle="Canvas">
      {isLoading ? null : (
        <>
          <StaticCanvasItems />
          <Docs />
          <Builder />
          <Collections />
          <Discovery />
          {data?.instances.map((instance) => (
            <Grid.Item
              key={instance.id}
              title={instance.release.app_name}
              content={{
                value: instance.release.icon_url ? instance.release.icon_url : { color: "#ED3FA2" },

                tooltip: instance.release.short_description || "No description",
              }}
              actions={
                <ActionPanel>
                  <ActionPanel.Section>
                    <Action.OpenInBrowser url={instance.url} />
                    <Action.OpenInBrowser title="Open in Discovery" url={`https://deta.space/discovery/r/${instance.release.id}`} />
                  </ActionPanel.Section>
                  <ActionPanel.Section>
                    {environment.isDevelopment ? <Action.CopyToClipboard title="Copy Link" content={JSON.stringify(instance)} shortcut={{ modifiers: ["cmd"], key: "." }} /> : null}
                    <Action.CopyToClipboard title="Copy Discovery Link" content={`https://deta.space/discovery/r/${instance.release.id}`} shortcut={{ modifiers: ["cmd", "shift"], key: "." }} />
                  </ActionPanel.Section>
                </ActionPanel>
              }
            />
          ))}
        </>
      )}
    </Grid>
  );
}

function StaticCanvasItems() {
  return (
    <>
      <Grid.Item
        content="https://deta.space/assets/deta.7c76948e.svg"
        title="Open Canvas"
        actions={
          <ActionPanel>
            <Action.OpenInBrowser url="https://deta.space/" />
            <Action.CopyToClipboard content="https://deta.space/l" />
          </ActionPanel>
        }
      />
      <Grid.Item
        content="https://deta.space/assets/legacy_cloud.43f2c117.webp"
        title="Legacy Cloud"
        actions={
          <ActionPanel>
            <Action.OpenInBrowser url="https://deta.space/legacy" />
            <Action.CopyToClipboard content="https://deta.space/legacy" />
          </ActionPanel>
        }
      />
      <Grid.Item
        content="https://deta.space/assets/manual.a2e80d80.webp"
        title="Manual"
        actions={
          <ActionPanel>
            <Action.OpenInBrowser url="https://deta.space/manual" />
            <Action.CopyToClipboard content="https://deta.space/manual" />
          </ActionPanel>
        }
      />
    </>
  );
}

function Discovery() {
  return (
    <Grid.Item
      content="https://deta.space/assets/discovery.b6035544.webp"
      title="Discovery"
      actions={
        <ActionPanel>
          <Action.Push icon={Icon.AppWindowList} title="Search Discovery" target={<SearchDiscovery />} />
          <Action.OpenInBrowser url="https://deta.space/discovery" />
        </ActionPanel>
      }
    />
  );
}

function Builder() {
  return (
    <Grid.Item
      content="https://deta.space/assets/builder.9b3437f3.webp"
      title="Builder"
      actions={
        <ActionPanel>
          <Action.Push icon={Icon.AppWindowList} title="Search Builder" target={<SearchProjects />} />
          <Action.OpenInBrowser url="https://deta.space/builder" />
        </ActionPanel>
      }
    />
  );
}

function Docs() {
  return (
    <Grid.Item
      content="https://deta.space/assets/docs.36387e5a.webp"
      title="Docs"
      actions={
        <ActionPanel>
          <Action.Push icon={Icon.AppWindowList} title="Search Docs" target={<SearchDocs />} />
          <Action.OpenInBrowser url="https://deta.space/docs" />
        </ActionPanel>
      }
    />
  );
}

function Collections() {
  return (
    <Grid.Item
      content="https://deta.space/assets/collections.9c538cc2.png"
      title="Collections"
      actions={
        <ActionPanel>
          <Action.Push icon={Icon.AppWindowList} title="Search Collections" target={<SearchCollections />} />
          <Action.OpenInBrowser url="https://deta.space/collections" />
        </ActionPanel>
      }
    />
  );
}
