import { Typography } from '@/components/typography';
import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { resetSimpleText, setSimpleText } from '../store/slices/counterSlice';
import { CustomButton } from '@/components/custom-button';

export function SimpleText2() {
  // !TODO: Bad implementation
  //   const { simpleText, setSimpleText, resetSimpleText } = useCounterStore();

  // Recommended implementation
  const simpleText = useSelector(
    (state: RootState) => state.counter.simpleText
  );

  const dispatch = useDispatch();

  function handleUpdateText() {
    dispatch(
      setSimpleText({
        text: 'Hi i am simple text ' + Math.round(Math.random() * 1000),
      })
    );
  }

  function handleResetText() {
    dispatch(resetSimpleText());
  }

  console.log(simpleText, `Simple text 2 `);

  return (
    <div className="rounded-lg bg-white p-6  shadow-2xl">
      <div className="space-y-4">
        <Typography size="h2">Simple Text 2</Typography>
        <Typography size="p1">{simpleText}</Typography>

        <div className="grid grid-cols-2 gap-3">
          <CustomButton
            colorScheme="primary"
            variant="fill"
            disabled={false}
            type="action"
            onButtonClick={handleUpdateText}
          >
            Set text
          </CustomButton>

          <CustomButton
            colorScheme="secondary"
            variant="fill"
            disabled={false}
            type="action"
            onButtonClick={handleResetText}
          >
            Reset text
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
