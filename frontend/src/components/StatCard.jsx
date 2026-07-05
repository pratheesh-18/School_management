const StatCard = ({ title, value, icon, colorClass = "text-blue-600 bg-blue-100" }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${colorClass} transition-transform group-hover:scale-110`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
