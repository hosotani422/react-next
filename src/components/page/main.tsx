/** @jsxRuntime classic */
/** @jsx nativeEvents */
import nativeEvents from 'jsx-native-events';
import React from 'react';
import InputTextbox from '@/components/input/textbox';
import InputCheck from '@/components/input/check';
import IconList from '@/components/icon/list';
import IconConf from '@/components/icon/conf';
import IconPlus from '@/components/icon/plus';
import IconClone from '@/components/icon/clone';
import IconMove from '@/components/icon/move';
import IconTrash from '@/components/icon/trash';
import app from "@/stores/page/app";
import list from "@/stores/page/list";
import main from "@/stores/page/main";

export default (props: { app: typeof app, list: typeof list, main: typeof main, children?: React.ReactNode }): JSX.Element | undefined => {
  const params = app.temp.router.query as { listId: string, mainId: string };
  return !params.listId ? undefined : (
    <div
      data-testid="MainRoot"
      className="theme-color-grad absolute inset-0 z-[1] flex flex-col"
      onTouchMove={(e) => {
        props.main.handle.dragStart();
        props.main.handle.dragMove({ listId: params.listId!, y: e.changedTouches[0]!.clientY });
      }}
      onMouseMove={(e) => {
        props.main.handle.dragStart();
        props.main.handle.dragMove({ listId: params.listId!, y: e.clientY });
      }}
      onTouchEnd={() => props.main.handle.dragEnd()}
      onMouseUp={() => props.main.handle.dragEnd()}
      onClick={() => props.main.handle.editItem({ listId: params.listId! })}
    >
      <div
        data-testid="MainHead"
        className="theme-color-grad theme-shadow-outer relative z-[9] flex flex-initial items-center gap-3 p-3"
      >
        <IconList data-testid="MainList" className="flex-initial" onClick={() => props.app.handle.routerList({listId: params.listId!})} />
        <InputTextbox
          data-testid="MainTitle"
          className="flex-1 text-xl"
          placeholder={ app.temp.i18next.t(`placeholder.list`) }
          value={ props.list.state.data.data[params.listId!].title }
          onInput={(e) => props.list.handle.inputValue({ listId: params.listId!, type: `title`, value: (e.target as HTMLInputElement).value })}
        />
        <IconConf data-testid="MainConf" className="flex-initial" onClick={() => props.app.handle.routerConf({listId: params.listId!})} />
        <IconPlus data-testid="MainPlus" className="flex-initial" onClick={() => props.main.handle.entryItem({listId: params.listId!})} />
      </div>
      <ul data-id="MainBody" data-testid="MainBody" className="flex-1 select-none overflow-auto p-3">
        { props.main.state.data[params.listId!].sort.map((mainId) =>
          <li
            key={mainId}
            data-id={`MainItem${mainId}`}
            data-testid="MainItem"
            className={`${props.main.render.classStatus({mainId, selectId: params.mainId!})} ${props.main.render.classLimit({ listId: params.listId!, mainId })} theme-color-border theme-color-back trans-select-label trans-edit-item trans-check-item anime-scale-item group relative flex h-16 items-center gap-3 overflow-hidden border-b-[0.1rem] border-solid p-3`}
            onContextMenu={(e) => e.preventDefault()}
            onClick={() => props.main.state.status[mainId] !== `edit` && props.app.handle.routerSub({listId: params.listId!, mainId})}
            onEventLongtouch={(e) => {
              props.main.handle.editItem({ listId: params.listId!, mainId });
              props.main.handle.dragInit({ mainId, y: e.detail.changedTouches[0]!.clientY });
            }}
            onEventLongclick={(e) => {
              props.main.handle.editItem({ listId: params.listId!, mainId });
              props.main.handle.dragInit({ mainId, y: e.detail.clientY });
            }}
          >
            <InputCheck
              data-testid="MainCheck"
              className="flex-initial"
              checked={ props.main.state.data[params.listId!].data[mainId].check }
              onChange={(e) => props.main.handle.inputValue({ listId: params.listId!, mainId, type: `check`, value: (e.target as HTMLInputElement).checked })}
              onClick={(e) => e.stopPropagation()}
            />
            <div data-testid="MainTask" className="line-clamp-1 flex-1">
              { props.main.state.data[params.listId!].data[mainId].title }
            </div>
            <div
              data-testid="MainCount"
              className="flex-initial"
            >
              { props.main.render.valueCount({ listId: params.listId!, mainId }) }
            </div>
            <div className="theme-color-back trans-option-label absolute right-3 flex translate-x-[150%] gap-3">
              <IconClone
                data-testid="MainClone"
                className="flex-initial"
                onClick={(e) => {
                  e.stopPropagation();
                  props.main.handle.copyItem({ listId: params.listId!, mainId });
                }}
              />
              <IconMove
                data-testid="MainMove"
                className="flex-initial"
                onClick={(e) => {
                  e.stopPropagation();
                  props.main.handle.moveItem({ listId: params.listId!, mainId });
                }}
              />
              <IconTrash
                data-testid="MainTrash"
                className="flex-initial"
                onClick={(e) => {
                  e.stopPropagation();
                  props.main.handle.deleteItem({ listId: params.listId!, mainId });
                }}
              />
            </div>
          </li>
        ) }
      </ul>
      { props.children }
    </div>
  )
};
