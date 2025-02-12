import { Typography } from '@/components/typography';
import { initialValues, simpleTextAtom } from '../store/counter/store';
import { CustomButton } from '@/components/custom-button';
import { useAtomValue, useSetAtom } from 'jotai';

export function SimpleText2() {
  // !TODO: Bad implementation
  //   const { simpleText, setSimpleText, resetSimpleText } = useCounterStore();

  // Recommended implemenatation
  const simpleText = useAtomValue(simpleTextAtom);
  const setSimpleText = useSetAtom(simpleTextAtom);

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
            onButtonClick={() =>
              setSimpleText(
                'Hi i am simple text ' + Math.round(Math.random() * 1000)
              )
            }
          >
            Set text
          </CustomButton>

          <CustomButton
            colorScheme="secondary"
            variant="fill"
            disabled={false}
            type="action"
            onButtonClick={() => setSimpleText(initialValues.simpleText)}
          >
            Reset text
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
