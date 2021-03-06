import { createNamespace } from '../utils';
import { inherit, emit } from '../utils/functional';
import { BORDER_SURROUND } from '../utils/constant';
import Icon from '../icon';

// Types
import { CreateElement, RenderContext } from 'vue/types';
import { DefaultSlots } from '../utils/types';

export type TagType = 'default' | 'primary' | 'success' | 'danger';

export type TagSize = 'large' | 'medium';

export type TagProps = {
  type: TagType;
  size?: TagSize;
  mark?: boolean;
  color?: string;
  plain?: boolean;
  round?: boolean;
  textColor?: string;
  closeable?: boolean;
};

const [createComponent, bem] = createNamespace('tag');

function Tag(
  h: CreateElement,
  props: TagProps,
  slots: DefaultSlots,
  ctx: RenderContext<TagProps>
) {
  const { type, mark, plain, color, round, size } = props;

  const key = plain ? 'color' : 'backgroundColor';
  const style = { [key]: color };

  if (props.textColor) {
    style.color = props.textColor;
  }

  const classes: { [key: string]: any } = { mark, plain, round };
  if (size) {
    classes[size] = size;
  }

  const Content = (
    <span
      style={style}
      class={[bem([classes, type]), { [BORDER_SURROUND]: plain }]}
      {...inherit(ctx, true)}
    >
      {slots.default && slots.default()}
      {props.closeable && (
        <Icon
          name="cross"
          class={bem('close')}
          onClick={() => {
            emit(ctx, 'close');
          }}
        />
      )}
    </span>
  );

  if (props.closeable) {
    return <transition name="van-fade">{Content}</transition>;
  }

  return Content;
}

Tag.props = {
  size: String,
  mark: Boolean,
  color: String,
  plain: Boolean,
  round: Boolean,
  textColor: String,
  closeable: Boolean,
  type: {
    type: String,
    default: 'default'
  }
};

export default createComponent<TagProps>(Tag);
