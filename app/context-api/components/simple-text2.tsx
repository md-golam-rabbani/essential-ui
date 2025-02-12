import { Typography } from '@/components/typography';
import { CustomButton } from '@/components/custom-button';
import { useCounterDispatch, useCounterState } from '../hooks/counterContext';

export function SimpleText2() {
  const { simpleText } = useCounterState();
  const dispatch = useCounterDispatch();

  console.log(simpleText, `from simple text 2 component`);

  return (
    <div className="rounded-lg bg-white p-6 shadow-2xl">
      <div className="space-y-4">
        <Typography size="h2">Simple Text 2</Typography>
        <Typography size="p1">{simpleText}</Typography>

        <div className="grid grid-cols-2 gap-3">
          <CustomButton
            colorScheme="primary"
            variant="fill"
            type="action"
            disabled={false}
            onButtonClick={() =>
              dispatch({
                type: 'SET_SIMPLE_TEXT',
                payload: `Hi I am simple text ${Math.round(Math.random() * 1000)}`,
              })
            }
          >
            Set text
          </CustomButton>

          <CustomButton
            disabled={false}
            colorScheme="secondary"
            variant="fill"
            type="action"
            onButtonClick={() => dispatch({ type: 'RESET_SIMPLE_TEXT' })}
          >
            Reset text
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
