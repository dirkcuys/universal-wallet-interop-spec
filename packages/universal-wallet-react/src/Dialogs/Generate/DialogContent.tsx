import React, { FC, HTMLAttributes } from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { LinkedDataIdentifier } from '../../LinkedDataIdentifier';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  setDialogState?: any;
  passwordToKey: any;
  seedToId: any;
}

export const DialogContent: FC<Props> = ({
  setDialogState,
  passwordToKey,
  seedToId,
}) => {
  const [seedId, setSeedId] = React.useState('');

  const handlePasswordChange = async (event: any) => {
    const password = event.target.value;
    const seed = await passwordToKey(password);
    let seedId = await seedToId(seed);

    setSeedId(seedId);
    setDialogState({
      seedId,
      seed: Buffer.from(seed).toString('hex'),
      password: password,
    });
  };

  return (
    <div style={{ padding: '16px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            label="Password"
            type="password"
            fullWidth
            onChange={handlePasswordChange}
          />
        </Grid>
        <Grid item xs={12}>
          <LinkedDataIdentifier value={seedId} />
        </Grid>
      </Grid>
    </div>
  );
};
