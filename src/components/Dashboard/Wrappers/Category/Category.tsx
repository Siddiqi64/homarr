import { Card, Group, Title } from '@mantine/core';
import { CategoryType } from '../../../../types/category';
import { HomarrCardWrapper } from '../../Tiles/HomarrCardWrapper';
import { Tiles } from '../../Tiles/tilesDefinitions';
import { GridstackTileWrapper } from '../../Tiles/TileWrapper';
import { useEditModeStore } from '../../Views/useEditModeStore';
import { useGridstack } from '../gridstack/use-gridstack';
import { CategoryEditMenu } from './CategoryEditMenu';

interface DashboardCategoryProps {
  category: CategoryType;
}

export const DashboardCategory = ({ category }: DashboardCategoryProps) => {
  const { refs, items, integrations } = useGridstack('category', category.id);
  const isEditMode = useEditModeStore((x) => x.enabled);

  return (
    <HomarrCardWrapper pt={10} mx={10}>
      <Group position="apart" align="center">
        <Title order={3}>{category.name}</Title>
        {isEditMode ? <CategoryEditMenu category={category} /> : null}
      </Group>
      <div
        className="grid-stack grid-stack-category"
        style={{ transitionDuration: '0s' }}
        data-category={category.id}
        ref={refs.wrapper}
      >
        {items?.map((service) => {
          const { component: TileComponent, ...tile } = Tiles['service'];
          return (
            <GridstackTileWrapper
              id={service.id}
              type="service"
              key={service.id}
              itemRef={refs.items.current[service.id]}
              {...tile}
              {...service.shape.location}
              {...service.shape.size}
            >
              <TileComponent className="grid-stack-item-content" service={service} />
            </GridstackTileWrapper>
          );
        })}
        {Object.entries(integrations).map(([k, v]) => {
          const { component: TileComponent, ...tile } = Tiles[k as keyof typeof Tiles];

          return (
            <GridstackTileWrapper
              id={k}
              type="module"
              key={k}
              itemRef={refs.items.current[k]}
              {...tile}
              {...v.shape.location}
              {...v.shape.size}
            >
              <TileComponent className="grid-stack-item-content" module={v} />
            </GridstackTileWrapper>
          );
        })}
      </div>
    </HomarrCardWrapper>
  );
};
