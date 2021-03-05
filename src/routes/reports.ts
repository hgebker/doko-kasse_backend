import { Router, Request } from 'express';
import { getSemesterReport, getCashReport } from 'modules/reports';

interface Query {
  semester: string;
}

const router = Router();

router.use((_req, _res, next) => {
  console.log('REPORTS');
  next();
});

router.get('/semester', async (req: Request<{}, {}, {}, Query>, res) => {
  const report = await getSemesterReport(res.locals.eveningsTable, req.query.semester);

  if (report) {
    res.status(200).send(report);
  } else {
    res.status(204).end();
  }
});

router.get('/cash', async (_req, res) => {
  const cashReport = await getCashReport(res.locals.eveningsTable, res.locals.expensesTable);

  if (cashReport) {
    res.status(200).send(cashReport);
  } else {
    res.status(204).end();
  }
});

export default router;
